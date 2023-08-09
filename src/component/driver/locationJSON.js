var area_city = {
  indore: {
    scheme_no_78: {
      lat: "23.89789",
      long: "74.8989898",
    },
    shalimar_township: {
      lat: "23.0777",
      long: "74.0777",
    },
    south_tuko_ganj: {
      lat: "23.0777",
      long: "74.0777",
    },
    vijay_nagar: {
      lat: "23.0777",
      long: "74.0777",
    },
  },

  ujjain: {
    mahakal_mandir: {
      lat: "23.0777",
      long: "74.0777",
    },
    mangal_nath: {
      lat: "23.0777",
      long: "74.0777",
    },
    kal_bhairav: {
      lat: "23.0777",
      long: "74.0777",
    },
  },

  bhopal: {
    vallabh_bhavan: {
      lat: "23.0777",
      long: "74.0777",
    },
    satpuda_bhavan: {
      lat: "23.0777",
      long: "74.0777",
    },
    raja_bhoj_square: {
      lat: "23.0777",
      long: "74.0777",
    },
  },
};

var area_lat_long = {};
var areavalue = [];
var obj_new = {};
for (let k in area_city) {
  let k_value = area_city[k];
  var i = 0;
  var obj_new1 = [];
  for (let key in k_value) {
    area_lat_long[key] = k_value[key];
    // area_lat_long.push(nnn);
    // console.log(k + "==" + key);

    obj_new1.push(key);
    i++;
  }
  obj_new[k] = obj_new1;
}
// areavalue.push(obj_new);
areavalue = obj_new;
// console.log(area_lat_long);
export { areavalue, area_city, area_lat_long };
