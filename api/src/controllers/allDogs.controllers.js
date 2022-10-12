const axios = require('axios')
const endpoint = `https://api.thedogapi.com/v1/breeds?api_key=`
const API_KEY = `4f36f783-1021-4034-8155-b0635db201a1`
const {Temperament, Dog} = require('../db')

/* funcion que llama a la api y se guarada los datos necesarios de los perros en infoApi */
const getApi = async () => {
  const getApi = await axios.get(
    `${endpoint}${API_KEY}`
  );
  const infoApi = getApi.data.map((response) => {
    return {
      id: response.id,
      name: response.name,
      height: response.height.metric.split(" - "),
      weight: response.weight.metric.split(" - "),
      temperament: response.temperament,
      image: response.image.url,
      life_span: response.life_span,
      origin: response.origin,
    };
  });
  return infoApi;
};

/*  funcion que retorna la informacion de la tabla Dog incluyendo la tabla temperament  */
const getDb = async () => {
  return await Dog.findAll({
    include: {
      model: Temperament,
      attribute: {
        include: ["name"],
      },
      through: {
        attribute: [],
      },
    },
  });
};

/*  funcion que utiliza las dos funciones anteriores para concatenar la informacion traida de la api con al de la db y retorna la informacion concatenada  */
const getAllDogs = async () => {
  let apiInfo = await getApi();
  let dbInfo = await getDb();
  const informacion = apiInfo.concat(dbInfo);
  return informacion;
};

/* const allDogs = async () => {
  const dogs = await axios.get(`${endpoint}${API_KEY}`)
  return dogs.data.map( (dog) => {
    return {
      id: dog.id,
      name: dog.name,
      image: dog.image.url,
      height: dog.height.metric,
      weight: dog.weight.metric,
      age: dog.life_span,
      temperament: dog.temperament,
    }
  })
};

const getTemps = async () => {
  const dogs = await allDogs()
  let temperaments = dogs.map( (dog) => dog.temperament ).toString()
  
    temperaments = await temperaments.split(',');
    const tempsConEspacio = await temperaments.map(el => {
        if (el[0] == ' ') {
            return el.split('');
        }
        return el;
    });
    const tempsSinEspacio = await tempsConEspacio.map(el => {
        if (Array.isArray(el)) {
            el.shift();
            return el.join('');
        }
        return el;
    })

    await tempsSinEspacio.forEach(el => {
        if (el != '') {
            Temperament.findOrCreate({
                where: {
                    name: el
                },
            });
        }
    });
    const allTemps = await Temperament.findAll();
    return allTemps
} */

module.exports = {
  getApi,
  getDb,
  getAllDogs
}