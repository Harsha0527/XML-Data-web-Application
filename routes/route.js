// const express = require("express");
// const { Award, PI, Inst, PerfInst, PgmEle, PgmRef, AppFund, OblgFy, Por } = require("../models/models"); // Import all models

// const router = express.Router();

// // List all awards
// router.get("/awards", async (req, res) => {
//   try {
//     const awards = await Award.findAll({
//       include: [
//         { model: PI, as: 'pis' },
//         { model: Inst, as: 'inst' },
//         { model: PerfInst, as: 'perf_inst' },
//         { model: PgmEle, as: 'pgm_eles' },
//         { model: PgmRef, as: 'pgm_refs' },
//         { model: AppFund, as: 'app_funds' },
//         { model: OblgFy, as: 'oblg_fys' },
//         { model: Por, as: 'por' }
//       ]
//     },{limit:100});
//     console.log(awards);
//     res.status(200).json(awards);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Error fetching data" });
//   }
// });

// // Search awards by title with associated data
// router.get("/awards/search", async (req, res) => {
//   const title = req.query.title;
//   if (!title) return res.status(400).json({ error: "Missing title parameter" });

//   try {
//     const awards = await Award.findAll({
//       where: { awd_titl_txt: { [Op.like]: `%${title}%` } },
//       include: [
//         { model: PI, as: 'pis' },
//         { model: Inst, as: 'inst' },
//         { model: PerfInst, as: 'perf_inst' },
//         { model: PgmEle, as: 'pgm_eles' },
//         { model: PgmRef, as: 'pgm_refs' },
//         { model: AppFund, as: 'app_funds' },
//         { model: OblgFy, as: 'oblg_fys' },
//         { model: Por, as: 'por' }
//       ]
//     });
//     res.json(awards);
//   } catch (error) {
//     res.status(500).json({ error: "Error searching data" });
//   }
// });


// module.exports = router;































const express = require("express");
const { Op } = require("sequelize");
const { Award, PI, Inst, PerfInst, PgmEle, PgmRef, AppFund, OblgFy, Por } = require("../models/models");
const router = express.Router();
const asyncHandler = require("express-async-handler");

// Helper function for pagination
const paginate = (page = 1, limit = 100) => ({
  offset: (page - 1) * limit,
  limit: parseInt(limit),
  distinct: true
});

// List all awards with pagination
// router.post("/awards", asyncHandler(async (req, res) => {
//   const { page = 1, limit = 5 } = req.body;
  
//   const { count, rows } = await Award.findAndCountAll({
//     ...paginate(page, limit),
//     include: [
//       { model: PI, as: 'pis' },
//       { model: Inst, as: 'inst' },
//       { model: PerfInst, as: 'perf_inst' },
//       { model: PgmEle, as: 'pgm_eles' },
//       { model: PgmRef, as: 'pgm_refs' },
//       { model: AppFund, as: 'app_funds' },
//       { model: OblgFy, as: 'oblg_fys' },
//       { model: Por, as: 'por' }
//     ],
//     // order: [['createdAt', 'DESC']]
//   });
// console.log(rows,'ckcodes');
//   res.json({
//     totalItems: count,
//     totalPages: Math.ceil(count / limit),
//     currentPage: parseInt(page),
//     itemsPerPage: parseInt(limit),
//     data: rows
//   });
// }));







router.post("/awards", asyncHandler(async (req, res) => {
  const { page = 1, limit = 5 } = req.body;
  
  // const { count, rows } = 
  const rows =await Award.findAll({
    ...paginate(page, limit),
    include: [
      { model: PI, as: 'pis' },
      { model: Inst, as: 'inst' },
      { model: PerfInst, as: 'perf_inst' },
      { model: PgmEle, as: 'pgm_eles' },
      { model: PgmRef, as: 'pgm_refs' },
      { model: AppFund, as: 'app_funds' },
      { model: OblgFy, as: 'oblg_fys' },
      { model: Por, as: 'por' }
    ],
    // order: [['createdAt', 'DESC']]
  });
  const count=await Award.count({});
console.log(rows.length,'ckcodes');
  res.json({
    totalItems: count,
    totalPages: Math.ceil(count / limit),
    currentPage: parseInt(page),
    itemsPerPage: parseInt(limit),
    data: rows
  });
}));










// Enhanced search with pagination and multi-field filtering
// router.post("/awards/search", asyncHandler(async (req, res) => {
//   const { searchTerm, page = 1, limit = 100 } = req.body;
//   if (!searchTerm) return res.status(400).json({ error: "Search term required" });

//   // Helper function to generate search conditions for a model's fields
//   const createModelConditions = (model) => {
//     const conditions = [];
//     const searchTermLower = searchTerm.toLowerCase();

//     Object.entries(model.rawAttributes).forEach(([field, config]) => {
//       // Handle string-based fields
//       if (['STRING', 'TEXT'].includes(config.type.key)) {
//         conditions.push({
//           [field]: {
//             [Op.like]: `%${searchTermLower}%`
//           }
//         });
//       }

//       // Handle numeric fields if search term is numeric
//       if (!isNaN(searchTerm)) {
//         if (['INTEGER', 'FLOAT', 'DOUBLE'].includes(config.type.key)) {
//           conditions.push({
//             [field]: Number(searchTerm)
//           });
//         }
//       }
//     });

//     return conditions;
//   };

//   // Generate conditions for all models
//   const awardConditions = createModelConditions(Award);
//   const piConditions = createModelConditions(PI);
//   const instConditions = createModelConditions(Inst);
//   const perfInstConditions = createModelConditions(PerfInst);
//   const pgmEleConditions = createModelConditions(PgmEle);
//   const pgmRefConditions = createModelConditions(PgmRef);
//   const appFundConditions = createModelConditions(AppFund);
//   const oblgFyConditions = createModelConditions(OblgFy);
//   const porConditions = createModelConditions(Por);

//   console.log({ awardConditions, piConditions, instConditions, perfInstConditions, pgmEleConditions, pgmRefConditions, appFundConditions, oblgFyConditions, porConditions }, 'ckcodes awards search');

//   try {
//     const rows = await Award.findAll({
//       where: {
//         [Op.or]: awardConditions
//       },
//       include: [
//         { model: PI, as: 'pis', where: { [Op.or]: piConditions }, required: false },
//         { model: Inst, as: 'inst', where: { [Op.or]: instConditions }, required: false },
//         { model: PerfInst, as: 'perf_inst', where: { [Op.or]: perfInstConditions }, required: false },
//         { model: PgmEle, as: 'pgm_eles', where: { [Op.or]: pgmEleConditions }, required: false },
//         { model: PgmRef, as: 'pgm_refs', where: { [Op.or]: pgmRefConditions }, required: false },
//         { model: AppFund, as: 'app_funds', where: { [Op.or]: appFundConditions }, required: false },
//         { model: OblgFy, as: 'oblg_fys', where: { [Op.or]: oblgFyConditions }, required: false },
//         { model: Por, as: 'por', where: { [Op.or]: porConditions }, required: false }
//       ],
//       limit: parseInt(limit),
//       offset: (page - 1) * limit
//     });

//     const count = await Award.count({
//       where: {
//         [Op.or]: awardConditions
//       },
//       include: [
//         { model: PI, as: 'pis', where: { [Op.or]: piConditions }, required: false },
//         { model: Inst, as: 'inst', where: { [Op.or]: instConditions }, required: false },
//         { model: PerfInst, as: 'perf_inst', where: { [Op.or]: perfInstConditions }, required: false },
//         { model: PgmEle, as: 'pgm_eles', where: { [Op.or]: pgmEleConditions }, required: false },
//         { model: PgmRef, as: 'pgm_refs', where: { [Op.or]: pgmRefConditions }, required: false },
//         { model: AppFund, as: 'app_funds', where: { [Op.or]: appFundConditions }, required: false },
//         { model: OblgFy, as: 'oblg_fys', where: { [Op.or]: oblgFyConditions }, required: false },
//         { model: Por, as: 'por', where: { [Op.or]: porConditions }, required: false }
//       ]
//     });

//     res.json({
//       totalItems: count,
//       totalPages: Math.ceil(count / limit),
//       currentPage: parseInt(page),
//       itemsPerPage: parseInt(limit),
//       data: rows
//     });
//   } catch (err) {
//     console.error('Error fetching data:', err);
//     res.status(500).json({ error: "Error fetching data" });
//   }
// }));


///present working search
// router.post("/awards/search", asyncHandler(async (req, res) => {
//   const { searchTerm, page = 1, limit = 5 } = req.body;
//   if (!searchTerm) return res.status(400).json({ error: "Search term required" });

//   // Helper function to generate search conditions for a model's fields
//   const createModelConditions = (model) => {
//     const conditions = [];
//     const searchTermLower = searchTerm.toLowerCase();

//     Object.entries(model.rawAttributes).forEach(([field, config]) => {
//       // Handle string-based fields
//       if (['STRING', 'TEXT'].includes(config.type.key)) {
//         conditions.push({
//           [field]: {
//             [Op.like]: `%${searchTermLower}%`
//           }
//         });
//       }

//       // Handle numeric fields if search term is numeric
//       if (!isNaN(searchTerm)) {
//         if (['INTEGER', 'FLOAT', 'DOUBLE'].includes(config.type.key)) {
//           conditions.push({
//             [field]: Number(searchTerm)
//           });
//         }
//       }
//     });

//     return conditions;
//   };

//   // Generate conditions for all models
//   const awardConditions = createModelConditions(Award);
//   const piConditions = createModelConditions(PI);
//   const instConditions = createModelConditions(Inst);
//   const perfInstConditions = createModelConditions(PerfInst);
//   const pgmEleConditions = createModelConditions(PgmEle);
//   const pgmRefConditions = createModelConditions(PgmRef);
//   const appFundConditions = createModelConditions(AppFund);
//   const oblgFyConditions = createModelConditions(OblgFy);
//   const porConditions = createModelConditions(Por);

//   console.log({ awardConditions, piConditions, instConditions, perfInstConditions, pgmEleConditions, pgmRefConditions, appFundConditions, oblgFyConditions, porConditions }, 'ckcodes awards search');

//   try {
//     const { count, rows } = await Award.findAndCountAll({
//       where: {
//         [Op.or]: awardConditions
//       },
//       include: [
//         { model: PI, as: 'pis' },
//         { model: Inst, as: 'inst' },
//         { model: PerfInst, as: 'perf_inst' },
//         { model: PgmEle, as: 'pgm_eles' },
//         { model: PgmRef, as: 'pgm_refs' },
//         { model: AppFund, as: 'app_funds' },
//         { model: OblgFy, as: 'oblg_fys' },
//         { model: Por, as: 'por' }
//         // { model: PI, as: 'pis', where: { [Op.or]: piConditions }, required: false },
//         // { model: Inst, as: 'inst', where: { [Op.or]: instConditions }, required: false },
//         // { model: PerfInst, as: 'perf_inst', where: { [Op.or]: perfInstConditions }, required: false },
//         // { model: PgmEle, as: 'pgm_eles', where: { [Op.or]: pgmEleConditions }, required: false },
//         // { model: PgmRef, as: 'pgm_refs', where: { [Op.or]: pgmRefConditions }, required: false },
//         // { model: AppFund, as: 'app_funds', where: { [Op.or]: appFundConditions }, required: false },
//         // { model: OblgFy, as: 'oblg_fys', where: { [Op.or]: oblgFyConditions }, required: false },
//         // { model: Por, as: 'por', where: { [Op.or]: porConditions }, required: false }
//       ],
//       distinct: true, // Ensure distinct results to avoid duplicates
//       ...paginate(page, limit)
//     });

//     console.log(rows.length, 'ckcodes');

//     res.json({
//       totalItems: count,
//       totalPages: Math.ceil(count / limit),
//       currentPage: parseInt(page),
//       itemsPerPage: parseInt(limit),
//       data: rows
//     });
//   } catch (err) {
//     console.error('Error fetching data:', err);
//     res.status(500).json({ error: "Error fetching data" });
//   }
// }));











router.post("/awards/search", asyncHandler(async (req, res) => {
  const { searchTerm, page = 1, limit = 5 } = req.body;
  if (!searchTerm) return res.status(400).json({ error: "Search term required" });

  // Helper function to generate search conditions for specific fields in the Award model
  const awardconditions = [];
  const instconditions = [];
  const createAwardConditions = (searchTerm) => {


    const searchTermLower = searchTerm.toLowerCase();

    const awardfieldsToSearch = ['awd_id', 'po_email', 'awd_titl_txt', 'po_phone', 'po_sign_block_name','awd_eff_date'];
    const instfieldsToSearch = ['inst_name','org_uei_num','instAwdId','inst_phone_num'];

    awardfieldsToSearch.forEach((field) => {
      awardconditions.push({
        [field]: {
          [Op.like]: `%${searchTermLower}%`
        }
      });
    });

    instfieldsToSearch.forEach((field) => {
      instconditions.push({
        [field]: {
          [Op.like]: `%${searchTermLower}%`
        }
      });
    });
    return {awardconditions,instconditions};
  };


  const awardConditions = createAwardConditions(searchTerm).awardconditions;
  const instfieldsToSearch = createAwardConditions(searchTerm).instconditions;
  console.log({ awardConditions }, 'ckcodes awards search');

  try {
    const { count, rows } = await Award.findAndCountAll({
      where: {
        [Op.or]: awardConditions
      },
      include: [
        { model: PI, as: 'pis' },
        { model: Inst, as: 'inst'},
        // { model: Inst, as: 'inst',where: {
        //   [Op.or]: instfieldsToSearch
        // } },
        { model: PerfInst, as: 'perf_inst' },
        { model: PgmEle, as: 'pgm_eles' },
        { model: PgmRef, as: 'pgm_refs' },
        { model: AppFund, as: 'app_funds' },
        { model: OblgFy, as: 'oblg_fys' },
        { model: Por, as: 'por' }
      ],
      distinct: true, // Ensure distinct results to avoid duplicates
      ...paginate(page, limit)
    });

    console.log(rows.length, 'ckcodes');

    res.json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      itemsPerPage: parseInt(limit),
      data: rows
    });
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ error: "Error fetching data" });
  }
}));







module.exports = router;