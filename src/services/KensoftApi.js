import React, {Component} from 'react';
import {Platform, Alert} from 'react-native';

/**
 * init class API
 * @param opt
 * @returns {KensoftApi}
 * @constructor
 */
function KensoftApi(opt) {
  if (!(this instanceof KensoftApi)) {
    return new KensoftApi(opt);
  }
  opt = opt || {};
  this.classVersion = '1.0.0';
  this._setDefaultsOptions(opt);
}

/**
 * Default option
 * @param opt
 * @private
 */
KensoftApi.prototype._setDefaultsOptions = async function (opt) {
  this.url = opt.url;
  this.logo = opt.logo;
  this.tags = null;
  this.categories = null;
  this.brands = null;
  this.questioncategories = null;
};

KensoftApi.prototype.getHomePage = function (data) {
  var requestUrl = '';
  if (data) {
    requestUrl = this.join(data, '&');
  } else {
    requestUrl = 'parent=0';
  }

  var requestUrl = this.url + '/services/getHomePage?' + requestUrl;

  return this._request(requestUrl).then(function (data) {
    return data;
  });
};

KensoftApi.prototype.getFeatures = function (data) {
  var requestUrl = '';
  if (data) {
    requestUrl = this.join(data, '&');
  } else {
    requestUrl = 'parent=0';
  }

  var requestUrl = this.url + '/services/FeaturesGet?' + requestUrl;

  return this._request(requestUrl).then(function (data) {
    return data;
  });
};

KensoftApi.prototype.getCategories = function (data) {
  var requestUrl = '';
  if (data) {
    requestUrl = this.join(data, '&');
  } else {
    requestUrl = 'parent=0';
  }

  var requestUrl = this.url + '/services/CategoriesGet?' + requestUrl;

  return this._request(requestUrl).then(function (data) {
    return data;
  });
};

KensoftApi.prototype.VendorCategories = function (data) {
  var requestUrl = '';
  if (data) {
    requestUrl = this.join(data, '&');
  } else {
    requestUrl = 'parent=0';
  }

  var requestUrl = this.url + '/services/VendorCategories?' + requestUrl;

  return this._request(requestUrl).then(function (data) {
    return data;
  });
};

KensoftApi.prototype.VendorGet = function (data) {
  var requestUrl = '';
  if (data) {
    requestUrl = this.join(data, '&');
  } else {
    requestUrl = 'parent=0';
  }

  var requestUrl = this.url + '/services/VendorGet?' + requestUrl;

  return this._request(requestUrl).then(function (data) {
    return data;
  });
};

KensoftApi.prototype.AddProduct = function (data) {
  var requestUrl = this.url;
  if (data) {
    requestUrl = this.url + '/services/AddProduct?';
    //requestUrl = requestUrl + this.join(data, '&');
  } else {
    requestUrl = 'parent=0';
  }
  return this._requestPost(requestUrl, data, (res) => {}).then(function (data) {
    return data;
  });
};

KensoftApi.prototype.Login = function (data) {
  var requestUrl = '';
  if (data) {
    requestUrl = this.join(data, '&');
  } else {
    requestUrl = 'parent=0';
  }

  var requestUrl = this.url + '/services/Login?' + requestUrl;

  return this._request(requestUrl).then(function (data) {
    return data;
  });
};

KensoftApi.prototype.Register = function (data) {
  var requestUrl = this.url;
  if (data) {
    requestUrl = this.url + '/services/RegisterUser?';
    //requestUrl = requestUrl + this.join(data, '&');
  } else {
    requestUrl = 'parent=0';
  }

  return this._requestPost(requestUrl, data, (res) => {}).then(function (data) {
    return data;
  });
};

KensoftApi.prototype.RegisterVendor = function (data) {
  var requestUrl = this.url;
  if (data) {
    requestUrl = this.url + '/services/RegisterVendor?';
    //requestUrl = requestUrl + this.join(data, '&');
  } else {
    requestUrl = 'parent=0';
  }

  return this._requestPost(requestUrl, data, (res) => {}).then(function (data) {
    return data;
  });
};

KensoftApi.prototype.RegisterDrive = function (data) {
  var requestUrl = this.url;
  if (data) {
    requestUrl = this.url + '/services/RegisterDrive?';
    //requestUrl = requestUrl + this.join(data, '&');
  } else {
    requestUrl = 'parent=0';
  }

  return this._requestPost(requestUrl, data, (res) => {}).then(function (data) {
    return data;
  });
};

KensoftApi.prototype.DriverPhotoAdd = function (data) {
  var requestUrl = this.url;
  if (data) {
    requestUrl = this.url + '/services/DriverPhotoAdd?';
    //requestUrl = requestUrl + this.join(data, '&');
  } else {
    requestUrl = 'parent=0';
  }
  return this._requestPost(requestUrl, data, (res) => {}).then(function (data) {
    return data;
  });
};

KensoftApi.prototype.GetPagedBranches = function (data) {
  var requestUrl = '';
  if (data) {
    requestUrl = this.join(data, '&');
  } else {
    requestUrl = 'parent=0';
  }

  var requestUrl = this.url + '/services/GetPagedBranches?' + requestUrl;

  return this._request(requestUrl).then(function (data) {
    return data;
  });
};

KensoftApi.prototype.UpdateUserInfo = function (data) {
  var requestUrl = '';
  if (data) {
    requestUrl = this.join(data, '&');
  } else {
    requestUrl = 'parent=0';
  }

  var requestUrl = this.url + '/services/UpdateUserInfo?' + requestUrl;

  return this._request(requestUrl).then(function (data) {
    return data;
  });
};

KensoftApi.prototype.UpdateDriverInfo = function (data) {
  var requestUrl = '';
  if (data) {
    requestUrl = this.join(data, '&');
  } else {
    requestUrl = 'parent=0';
  }

  var requestUrl = this.url + '/services/UpdateDriverInfo?' + requestUrl;

  return this._request(requestUrl).then(function (data) {
    return data;
  });
};

KensoftApi.prototype.GetProductsByVendorID = function (data) {
  var requestUrl = '';
  if (data) {
    requestUrl = this.join(data, '&');
  } else {
    requestUrl = 'parent=0';
  }

  var requestUrl = this.url + '/services/GetProductsByVendorID?' + requestUrl;

  return this._request(requestUrl).then(function (data) {
    return data;
  });
};

KensoftApi.prototype.ProviderStatusGet = function (data) {
  var requestUrl = '';
  if (data) {
    requestUrl = this.join(data, '&');
  } else {
    requestUrl = 'parent=0';
  }

  var requestUrl = this.url + '/services/ProviderStatusGet?' + requestUrl;

  return this._request(requestUrl).then(function (data) {
    return data;
  });
};

KensoftApi.prototype.UpdateCartStatus = function (data) {
  var requestUrl = '';
  if (data) {
    requestUrl = this.join(data, '&');
  } else {
    requestUrl = 'parent=0';
  }

  var requestUrl = this.url + '/services/UpdateCartStatus?' + requestUrl;

  return this._request(requestUrl).then(function (data) {
    return data;
  });
};

KensoftApi.prototype.ProviderActive = function (data) {
  var requestUrl = '';
  if (data) {
    requestUrl = this.join(data, '&');
  } else {
    requestUrl = 'parent=0';
  }

  var requestUrl = this.url + '/services/ProviderActive?' + requestUrl;

  return this._request(requestUrl).then(function (data) {
    return data;
  });
};

KensoftApi.prototype.ProviderAcceptRequest = function (data) {
  var requestUrl = '';
  if (data) {
    requestUrl = this.join(data, '&');
  } else {
    requestUrl = 'parent=0';
  }

  var requestUrl = this.url + '/services/ProviderAcceptRequest?' + requestUrl;

  return this._request(requestUrl).then(function (data) {
    return data;
  });
};

KensoftApi.prototype.DriverCheckOrder = function (data) {
  var requestUrl = '';
  if (data) {
    requestUrl = this.join(data, '&');
  } else {
    requestUrl = 'parent=0';
  }

  var requestUrl = this.url + '/services/DriverCheckOrder?' + requestUrl;

  return this._request(requestUrl).then(function (data) {
    return data;
  });
};


KensoftApi.prototype.ProviderRejectRequest = function (data) {
  var requestUrl = '';
  if (data) {
    requestUrl = this.join(data, '&');
  } else {
    requestUrl = 'parent=0';
  }

  var requestUrl = this.url + '/services/ProviderRejectRequest?' + requestUrl;

  return this._request(requestUrl).then(function (data) {
    return data;
  });
};

KensoftApi.prototype.getOrderStatus = function (data) {
  var requestUrl = '';
  if (data) {
    requestUrl = this.join(data, '&');
  } else {
    requestUrl = 'parent=0';
  }

  var requestUrl = this.url + '/services/getOrderStatus?' + requestUrl;

  return this._request(requestUrl).then(function (data) {
    return data;
  });
};

KensoftApi.prototype.SetUserToken = function (data, callback) {
  var requestUrl = this.url + '/services/SetUserToken?';
  requestUrl += this.join(data, '&');

  return this._request(requestUrl).then(function (data) {
    return data;
  });
};

KensoftApi.prototype.GetDriverOrders = function (data, callback) {
  var requestUrl = '';
  if (data) {
    requestUrl = this.join(data, '&');
  } else {
    requestUrl = 'parent=0';
  }

  var requestUrl = this.url + '/services/GetDriverOrders?' + requestUrl;

  return this._request(requestUrl).then(function (data) {
    return data;
  });
};

KensoftApi.prototype.GetProductWithSpecs = function (data) {
  var requestUrl = '';
  if (data) {
    requestUrl = this.join(data, '&');
  } else {
    requestUrl = 'parent=0';
  }

  var requestUrl = this.url + '/services/GetProductWithSpecs?' + requestUrl;

  return this._request(requestUrl).then(function (data) {
    return data;
  });
};

KensoftApi.prototype.DeleteProduct = function (data) {
  var requestUrl = '';
  if (data) {
    requestUrl = this.join(data, '&');
  } else {
    requestUrl = 'parent=0';
  }

  var requestUrl = this.url + '/services/DeleteProduct?' + requestUrl;

  return this._request(requestUrl).then(function (data) {
    return data;
  });
};

/**
 * Request to the server,
 * You fixed: https://gist.github.com/pranavrajs/66bccee3f8ba100742a1273db6f587af
 * @param url
 * @param callback
 * @returns {axios.Promise}
 * @private
 */
KensoftApi.prototype._request = function (url, callback) {
  var self = this;
  console.log(JSON.stringify(url));
  return fetch(url)
    .then((response) => response.text()) // Convert to text instead of res.json()
    .then((text) => {
      if (Platform.OS === 'android') {
        //text = text.replace(/\r?\n/g, "").replace(/[\u0080-\uFFFF]/g, ""); // If android , I've removed unwanted chars.
      }
      return text;
    })
    .then((response) => JSON.parse(response))

    .catch((error, data) => {})
    .then((responseData) => {
      // if (typeof callback == 'function') {
      //   callback();
      // }
      return responseData;
    })
    .catch((error) => {});
};
/**
 * Post to the server
 * @param url
 * @param data
 * @param callback
 * @returns {axios.Promise}
 * @private
 */
KensoftApi.prototype._requestPost = function (url, data, callback) {
  var self = this;
  console.log(url);
  console.log(JSON.stringify(data));
  var params = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // 'X-CSRFToken':  cookie.load('csrftoken')
    },
    credentials: 'same-origin',
    mode: 'same-origin',
    body: JSON.stringify(data),
  };
  return fetch(url, params)
    .then((response) => response.json())

    .catch((error, data) => {})
    .then((responseData) => {
      if (typeof callback == 'function') {
        callback();
      }
      return responseData;
    })
    .catch((error) => {});
};

/**
 * Get default logo from Wordpress
 * @returns {logo|{height, width, marginLeft}|{marginBottom, marginTop, height, width, alignSelf}|boolean|{width, height, resizeMode, marginTop, marginBottom, marginLeft}|{resizeMode, height, marginTop, marginRight, marginBottom, marginLeft}|*}
 */
KensoftApi.prototype.getLogo = function () {
  return this.logo;
};

KensoftApi.prototype.join = function (obj, separator) {
  var arr = [];
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] != null) arr.push(key + '=' + obj[key]);
    }
  }
  return arr.join(separator);
};

export default KensoftApi;
