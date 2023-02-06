const cds = require("@sap/cds")

cds.on('served', async () => {
    const { 'cds.xt.SaasProvisioningService': provisioning } = cds.services
    // Add provisioning logic only if multitenancy is there..
    if (provisioning) {
        let tenantProvisioning = require('./provisioning')
        provisioning.prepend(tenantProvisioning)
    } else {
        console.log(">>> There is no service, therefore does not serve multitenancy!")
    }
})

module.exports = cds.server

