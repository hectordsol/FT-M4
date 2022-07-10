const { Router } = require('express');
const { Op, Character, Role } = require('../db');
const router = Router();

router.post('/', async (req, res) => {
    const { code, name, hp, mana}= req.body;
    if (!code || !name || !hp || !mana ) {
        return res.status(404).send('Falta enviar datos obligatorios')
    }
    try {
        const character = await Character.create(req.body);
        res.status(201).json(character);
    } catch (error) {
        res.status(404).send('Error en alguno de los datos provistos');
    }
})
router.get('/', async (req, res) => {
   const {name,race,age,hp,mana} = req.query;
   
   const condition ={};
   const where = {};
   const attr = [];
   if (race && age) {
       const characters = await Character.findAll({
      where: {
        [Op.and]: [{ race: { [Op.eq]: race } }, { age: { [Op.eq]: age } }],
    },
});
return res.json(characters);
}


   if (race) {
       where.race = race; // si pasan atributo race por query agrego a where propiedad race
       condition.where = where; // agregó el objeto where a condition como propiedad
       const characters = await Character.findAll( condition );
       return res.json(characters); // 
    } 
    // le pasaría algo asi en el caso de la consulta /character?race=Human:
// condition = {
    //      where: { race: 'Human'}
    //}
    // o un objeto vacío si no llega nada
    
    if (name && hp){ attr.push('name');attr.push('hp');
    const characters = await Character.findAll({attributes: attr
    });
    return res.json(characters);
}

const characters = await Character.findAll();

res.json(characters);
})
router.get("/young", async (req, res) => {
    const characters = await Character.findAll({// encontrar todos
        where: { // donde
        age: { [Op.lt]: 25 }, // la edad sea menor a 25 (lower than)
    },
    });
    if (!characters) { // si no encuentra ningún personaje
        return res
        .status(201)
        .json({ msg: "There is 0 characters lower than 25 years old" });
    } 
    res.json(characters); // si encuentra personajes, los devuelve
});
router.get('/:code', async (req, res) => {
    const {code} = req.params;
    const character = await Character.findByPk(code);
    if (!character) { 
        return res
        .status(404)
        .send(`El código ${code} no corresponde a un personaje existente`) 
    }
    res.json(character);
})
router.put('/addAbilities', async (req, res) => {
   const { abilities, codeCharacter } = req.body;
   let character = await Character.findByPk(codeCharacter);
  let abilitiesArray = abilities.map(e=> character.createAbility(e));
  await Promise.all(abilitiesArray);
  res.status(201).json(character);
})

router.put("/:attribute", async (req, res) => {
    const { attribute } = req.params;
    const { value } = req.query;
    
    await Character.update(
        {
            [attribute]: value,
        },
        {
        where: { [attribute]: { [Op.is]: null } },
      }
    );
  
    res.send("Personajes actualizados");
  });

  router.get('/roles/:code', async (req, res) => {
    const {code} = req.params;
    const character = await Character.findByPk(code, {include: Role});
    res.json(character);
})

module.exports = router;