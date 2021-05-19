/**
 * MMHelper for workflow.
 */
const MMWorkflow = {
  // Urls by environnement.
  url: {
    local: "http://localhost:8000",
    preprod: "http://173.212.212.64",
    production: "http://192.168.90.55",
  },
  urlReporting: {
    local: "http://localhost:3000",
    preprod: "http://173.212.212.64:3001",
    production: "http://192.168.90.55:3001",
  },
  userAuth: {
    username: 'elvis-reporting-admin',
    password: '2b$12$FaLabMRystU4MLAasNOKb.HUElBAabuQdX59RWHq5X.9Ghm692NEi'
  },
  getCurrentUsername: function() {
    const elvisContext = ElvisPlugin.resolveElvisContext();
    return elvisContext.app.userProfile.username;
  },
  // fnc in array.
  inArray: function (element, array) {
    const find = array.includes(element);
    return find;
  },
  // fnc in object.
  inObject: function (element, object) {
    return element in object;
  },
  // Disable Element
  disableElement: function (id_element) {
    const element = document.getElementById(id_element);
    const attrDisabled = document.createAttribute("disabled");
    attrDisabled.value = true;
    element.setAttributeNode(attrDisabled);
  },
  // List action status by roles.
  permissionsStatus: {
    photographe: [
      {
        "DRAFT": ["see", "edit"],
        "EN COURS": ["see", "edit"],
        "A SUPPRIMER": ["see", "edit"],
      },
    ],
    editeur: [
      {
        "EN COURS": ["see"],
        "A TRAITER": ["see", "edit"],
        "A VALIDER": ["see", "edit"],
      },
    ],
    validateur: [
      {
        "A VALIDER": ["see"],
        "PUBLIE": ["see", "edit"],
      },
    ],
    documentaliste: [
      {
        "PUBLIE": ["see"],
        "ARCHIVE": ["see", "edit"],
      },
    ],
    journalist: [
      {
        "A TRAITER": ["see", "edit"],
        "A VALIDER": ["see", "edit"],
        "PUBLIE": ["see", "edit"],
        "ARCHIVE": ["see", "edit"],
      },
    ],
    responsable: [
      {
        "DRAFT": ["see", "edit"],
        "EN COURS": ["see", "edit"],
        "A SUPPRIMER": ["see", "edit"],
        "A TRAITER": ["see", "edit"],
        "A VALIDER": ["see", "edit"],
        "PUBLIE": ["see"],
        "ARCHIVE": ["see", "edit"],
      },
    ],
  },
  // Get permission by role user.
  getStatusByRole: function (roles) {
    let list = {};
    for (let i = 0; i < roles.length; i++) {
      const permissions =  this.permissionsStatus[roles[i]][0];
      list = {...permissions, ...list};
    }
    console.log('list', list);
    // return this.permissionsStatus[roles[0]][0];
    return list;
  },
  // getStatusByRole: function (roles) {
  //   console.log('length', roles.length)
  //   if (roles.length) {
  //     for (var i = 0; i < roles.length; i++) {
  //       const permissions = this.permissionsStatus[roles[i]][0];
  //       console.log('permissions', permissions);
  //     }
  //   }
  //   // return this.permissionsStatus[role][0];
  // },
  // Append options to select field status.
  addOptionsToStatusField: function (statusAsset, statusUser) {
    let listStatus = "";
    console.log('statusUser2', statusUser);
    if (this.inObject(statusAsset, statusUser)) {
      for (let value of Object.keys(statusUser)) {
        let selected = "";
        if (value === statusAsset) {
          selected = "selected";
        }
        listStatus +=
          '<option value="' +
          value +
          '" ' +
          selected +
          ">" +
          value +
          "</option>";
      }
    } else {
      listStatus +=
        '<option value="' + statusAsset + '">' + statusAsset + "</option>";
      this.disableElement("btn-save");
      this.disableElement("status");

      document.getElementById("message").innerHTML =
        '<div class="alert alert-danger"><h4 class="alert-heading">Error</h4><p>Vous n\'avez pas les permissions pour modifier le status</p></div>';
    }
    let statusElement = document.getElementById("status");
    statusElement.innerHTML = listStatus;
    statusElement.defaultValue = statusAsset;
  },
  // Update status metadata using php server and ELVIS API.
  updateStatusAsset: function (id_asset, status) {
    const me = this;
    // const url = "http://localhost:8000/update-status.php";
    const params = `id=${id_asset}&status=${status}`;
    console.log('params', params);
    const http = new XMLHttpRequest();
    // console.log("me.url[evironnement]", me.url[evironnement]);
    http.open("POST", me.url[evironnement] + '/update-status.php', true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.onreadystatechange = function () {
      let messageElement = document.getElementById("message");
      const httpReadyState = http.readyState;
      const httpStatus = http.status;

      if (httpReadyState == 4 && httpStatus == 200) {
        const response = JSON.parse(http.responseText);
        if (response.errorcode) {
          messageElement.innerHTML =
            '<div class="alert alert-danger"><h4 class="alert-heading">Error</h4><p>' +
            response.message +
            "</p></div>";
        } else {
          messageElement.innerHTML =
            '<div class="alert alert-success"><h4 class="alert-heading">Success</h4><p>Le status a bien été modifié!</p></div>';

            // Insert in reporting.
            me.saveReporting(id_asset, status);
        }
      } else if (httpReadyState == 4 && httpStatus == 0) {
        console.log("http", http);
        messageElement.innerHTML = `<div class="alert alert-danger"><h4 class="alert-heading">Error</h4><p>${me.url[evironnement]} de webservice est horsligne!
          </p></div>`;
      }

      // Hide message.
      me.fade(messageElement);
    };
    http.send(params);
  },
  // Animation fade out.
  fade: function (element) {
    let op = 1;
    let timer = setInterval(function () {
      if (op <= 1) {
        clearInterval(timer);
        element.innerHTML = "";
        element.style.display = "block";
        element.style.opacity = 1;
      }
      element.style.opacity = op;
      element.style.filter = "alpha(opacity=" + op * 100 + ")";
      op -= op * 0.1;
    }, 3000);
  },
  saveReporting(id_asset) {
    const me = this;

    // const asset = elvisContext.activeTab.assetSelection[0].metadata.status;
    $.ajax({
      type: 'POST',
      url: me.url[evironnement] + '/search-asset.php',
      data: { id: id_asset },
      success: function (res){
        // TODO: check if asset existe and then continue.
        const response = JSON.parse(res);
        console.log('response', response);
        console.log('response.totalHits', response.totalHits);
        if (response.totalHits > 0) {
          const assetFound = response.hits[0];
          const metadata = assetFound.metadata;
        console.log('metadata.category', metadata.category);
          const category = me.getAssetCategory(metadata.category, mapphoto_catgories);

          // Asset object.
          const asset = {
            username: me.getCurrentUsername(),
            action: "WORKFLOW_UPDATE_STATUS", // Check doc API reporting service.
            eventTitle: metadata.cf_event_name,
            elvisId: id_asset,
            status: metadata.status,
            category: category.code,
            copyright: metadata.copyright.toUpperCase(),
          };
          console.log('asset', asset);

          // Save reporting.
          $.ajax({
            type: 'POST',
            url: me.urlReporting[evironnement] + '/api/report/create-asset',
            data: asset,
            headers: {
              'Authorization': 'Basic ' + window.btoa(MMWorkflow.userAuth.username + ':' + MMWorkflow.userAuth.password)
            },
            success: function (res){
              console.log('res', res)
              console.log('Workflow action has been reported!');
            }
          });
        }
      }
    });
  },
  getAssetCategory: function(title, data) {
    let category;
    category = data.filter(function(cat) {
      return cat.title === title;
    });
    if (category.length > 0) {
      return category[0];
    }
  }
};
