const { DataTypes } = require('sequelize');
const sequelize = require('../dbconn'); // Adjust the path as necessary

// Main Award Model
const Award = sequelize.define('awards', {
  awd_id: {
    type: DataTypes.STRING,
    allowNull: true,
    primaryKey: true
  },
  agcy_id: {
    type: DataTypes.STRING,
    allowNull: true
  },
  tran_type: {
    type: DataTypes.STRING,
    allowNull: true
  },
  awd_istr_txt: {
    type: DataTypes.STRING,
    allowNull: true
  },
  awd_titl_txt: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cfda_num: {
    type: DataTypes.STRING,
    allowNull: true
  },
  org_code: {
    type: DataTypes.STRING,
    allowNull: true
  },
  po_phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  po_email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  po_sign_block_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  awd_eff_date: {
    type: DataTypes.STRING,
    allowNull: true
  },
  awd_exp_date: {
    type: DataTypes.STRING,
    allowNull: true
  },
  tot_intn_awd_amt: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  awd_amount: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  awd_min_amd_letter_date: {
    type: DataTypes.STRING,
    allowNull: true
  },
  awd_max_amd_letter_date: {
    type: DataTypes.STRING,
    allowNull: true
  },
  awd_abstract_narration: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  awd_arra_amount: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  dir_abbr: {
    type: DataTypes.STRING,
    allowNull: true
  },
  org_dir_long_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  div_abbr: {
    type: DataTypes.STRING,
    allowNull: true
  },
  org_div_long_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  awd_agcy_code: {
    type: DataTypes.STRING,
    allowNull: true
  },
  fund_agcy_code: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'awards',
  timestamps: false
});

// PI Model
const PI = sequelize.define('pis', {
  pi_role: {
    type: DataTypes.STRING,
    allowNull: true
  },
  pi_first_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  pi_last_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  pi_mid_init: {
    type: DataTypes.STRING,
    allowNull: true
  },
  pi_sufx_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  pi_full_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  pi_email_addr: {
    type: DataTypes.STRING,
    allowNull: true
  },
  nsf_id: {
    type: DataTypes.STRING,
    allowNull: true
  },
  pi_start_date: {
    type: DataTypes.STRING,
    allowNull: true
  },
  pi_end_date: {
    type: DataTypes.STRING,
    allowNull: true
  },
  // awardAwdId:{
  //   type: DataTypes.STRING,
  //   allowNull: true
  // }
}, {
  tableName: 'pis',
  timestamps: false
});

// Inst Model
const Inst = sequelize.define('insts', {
  inst_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  inst_street_address: {
    type: DataTypes.STRING,
    allowNull: true
  },
  inst_street_address_2: {
    type: DataTypes.STRING,
    allowNull: true
  },
  inst_city_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  inst_state_code: {
    type: DataTypes.STRING,
    allowNull: true
  },
  inst_state_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  inst_phone_num: {
    type: DataTypes.STRING,
    allowNull: true
  },
  inst_zip_code: {
    type: DataTypes.STRING,
    allowNull: true
  },
  inst_country_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cong_dist_code: {
    type: DataTypes.STRING,
    allowNull: true
  },
  st_cong_dist_code: {
    type: DataTypes.STRING,
    allowNull: true
  },
  org_lgl_bus_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  org_prnt_uei_num: {
    type: DataTypes.STRING,
    allowNull: true
  },
  org_uei_num: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'insts',
  timestamps: false
});

// PerfInst Model
const PerfInst = sequelize.define('perf_insts', {
  perf_inst_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  perf_str_addr: {
    type: DataTypes.STRING,
    allowNull: true
  },
  perf_city_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  perf_st_code: {
    type: DataTypes.STRING,
    allowNull: true
  },
  perf_st_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  perf_zip_code: {
    type: DataTypes.STRING,
    allowNull: true
  },
  perf_ctry_code: {
    type: DataTypes.STRING,
    allowNull: true
  },
  perf_cong_dist: {
    type: DataTypes.STRING,
    allowNull: true
  },
  perf_st_cong_dist: {
    type: DataTypes.STRING,
    allowNull: true
  },
  perf_ctry_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  perf_ctry_flag: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'perf_insts',
  timestamps: false
});

// PgmEle Model
const PgmEle = sequelize.define('pgm_eles', {
  pgm_ele_code: {
    type: DataTypes.STRING,
    allowNull: true
  },
  pgm_ele_name: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'pgm_eles',
  timestamps: false
});

// PgmRef Model
const PgmRef = sequelize.define('pgm_refs', {
  pgm_ref_code: {
    type: DataTypes.STRING,
    allowNull: true
  },
  pgm_ref_txt: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'pgm_refs',
  timestamps: false
});

// AppFund Model
const AppFund = sequelize.define('app_funds', {
  app_code: {
    type: DataTypes.STRING,
    allowNull: true
  },
  app_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  app_symb_id: {
    type: DataTypes.STRING,
    allowNull: true
  },
  fund_code: {
    type: DataTypes.STRING,
    allowNull: true
  },
  fund_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  fund_symb_id: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'app_funds',
  timestamps: false
});

// OblgFy Model
const OblgFy = sequelize.define('oblg_fys', {
  fund_oblg_fiscal_yr: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  fund_oblg_amt: {
    type: DataTypes.FLOAT,
    allowNull: true
  }
}, {
  tableName: 'oblg_fys',
  timestamps: false
});

// Por Model
const Por = sequelize.define('pors', {
  por_cntn: {
    type: DataTypes.STRING,
    allowNull: true
  },
  por_txt_cntn: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'pors',
  timestamps: false
});

// Associations
Award.hasMany(PI, { as: 'pis' });
PI.belongsTo(Award);

Award.hasOne(Inst, { as: 'inst' });
Inst.belongsTo(Award);

Award.hasOne(PerfInst, { as: 'perf_inst' });
PerfInst.belongsTo(Award);

Award.hasMany(PgmEle, { as: 'pgm_eles' });
PgmEle.belongsTo(Award);

Award.hasMany(PgmRef, { as: 'pgm_refs' });
PgmRef.belongsTo(Award);

Award.hasMany(AppFund, { as: 'app_funds' });
AppFund.belongsTo(Award);

Award.hasMany(OblgFy, { as: 'oblg_fys' });
OblgFy.belongsTo(Award);

Award.hasOne(Por, { as: 'por' });
Por.belongsTo(Award);

// Repeat associations for other nested models
// sequelize.sync({ alter: true })
//   .then(() => console.log("✅ Database synchronized"))
//   .catch((err) => console.error("❌ Sync failed", err));
// DROP TABLE `awards`,`insts`,`oblg_fys`,`pgm_eles`,`perf_insts`,`pgm_refs`,`pis`,`pors`,`app_funds`
module.exports = { Award, PI, Inst, PerfInst, PgmEle, PgmRef, AppFund, OblgFy, Por };