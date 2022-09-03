const { Router } = require("express");
const { getApi, getDb, getAllDogs } = require("../controllers/allDogs.controllers");
const {Temperament, Dog} = require('../db')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

/* ruta que valida si hay un nombre. Si no hay retorna toda la informacion de los perros incluyendo el temperamento, siempre y cuando no falle el llamado a la api. En el caso de que se envie un nombre por query filtramos por el nombre el array con todos los perros y devuelve solo los que coinciden.. solo en el caso de que coincidan */
router.get(`/dogs`, async (req, res, next) => {
  try {
    const { name } = req.query;
    if (!name) {
      const apiInfo = await getApi();
      const dbInfo = await getDb();
      const informacion = await apiInfo.concat(dbInfo);
      informacion.length
        ? res.status(200).send(informacion)
        : res.status(404).send("Api not found");
    }
    if (name) {
      const api = await getAllDogs();
      let dogName = await api.filter((d) =>
        d.name.toLowerCase().includes(name.toLowerCase())
      );
      dogName.length
        ? res.status(200).send(dogName)
        : res.status(404).send("Dog not found");
    }
  } catch (err) {
    next(err);
  }
});

/* ruta que valida si hay un id en params y filtra a los perros segun el id */
router.get(`/dogs/:id`, async (req, res, next) => {
  try {
    const { id } = req.params;
    const dogsTotal = await getAllDogs();

    if (typeof id === "string" && id.length > 8) {
      let filter = dogsTotal.filter((el) => el.id == id);
      res.status(200).send(filter);
    } else {
      const infoApi = await getAllDogs();
      const find = infoApi.find((data) => data.id === Number(id));
      res.status(200).json(find);
    }
  } catch (err) {
    next(err);
  }
});

/* ruta que nos obtiene los temperamentos desde la api y los guarda en la db */
router.get(`/temperament`, async (req, res, next) => {
  try {
    const array = [];
    const arr = [];
    const apiData = await getAllDogs()
    const infoTemperament = apiData.map((d) => {
      return {
        temperament: d.temperament,
      };
    });

    const filtro = infoTemperament.filter((d) => d.temperament !== undefined);

    filtro.map((d) => {
      array.push(d.temperament.split(","));
      return array;
    });

    array.forEach((d) => {
      for (var i = 0; i < d.length; i++) {
        d[i] = d[i].trimStart();
        arr.push(d[i]);
      }
    });

    const tabla = {};
    const unicos = arr.filter((indice) => {
      return tabla.hasOwnProperty(indice) ? false : (tabla[indice] = true);
    });
    unicos.sort();

    const dbApi = unicos.map((d) => {
      return Temperament.findOrCreate({
        where: {
          name: d,
        },
      });
    });

    let infoDbApi = await Temperament.findAll();
    res.status(200).json(infoDbApi);
  } catch (err) {
    next(err);
  }
});

router.post(`/dogs`, async (req, res, next) => {
  try {
    let {
      name,
      origin,
      life_span,
      height_min,
      height_max,
      weight_min,
      weight_max,
      age,
      image,
      temperament,
      createInDb,
    } = req.body;
    const createDog = await Dog.create({
      name,
      origin,
      life_span,
      height_min,
      height_max,
      weight_min,
      weight_max,
      age,
      image,
      createInDb,
    });

    let dogTemperament = await Temperament.findAll({
      where: {
        name: temperament,
      },
    });
    createDog.addTemperament(dogTemperament);
    res.status(200).send("Dog created successfully");
  } catch (err) {
    next(err);
  }
});

/* router.get("/", async (req, res) =>{
    try {
        const dogs = await allDogs()
        res.status(200).send(dogs)
    } catch (err) {
        console.log('error en el get', err.message)
    }
});
router.get("/temperament", async (req, res) =>{
    try {
        const temps = await getTemps()
        res.status(200).send(temps)
    } catch (err) {
        console.log('error en el get', err.message)
    }
}); */

module.exports = router;
