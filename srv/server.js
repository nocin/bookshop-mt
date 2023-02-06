const cds = require("@sap/cds")
const xsenv = require("@sap/xsenv")

if (process.env.NODE_ENV) {
    xsenv.loadEnv()
    const services = xsenv.getServices({
        dest: { tag: "destination" }
    })
    console.log('>>> Service dest name: ' + services.dest.xsappname)
    cds.env.mtx.dependencies = [services.dest.xsappname]
}


cds.on('served', async () => {
    const { 'cds.xt.SaasProvisioningService': provisioning } = cds.services
    // Add provisioning logic only if multitenancy is there..
    if(provisioning){
        let tenantProvisioning = require('./provisioning');
        provisioning.prepend(tenantProvisioning);
    }
    else{
        console.log("There is no service, therefore does not serve multitenancy!");
    }
  })

module.exports = cds.server

