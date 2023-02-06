const cds = require('@sap/cds');
const xsenv = require('@sap/xsenv');
xsenv.loadEnv();

module.exports = (service) => {

    service.on('dependencies', async (req, next) => {
        let dependencies = await next();
        const services = xsenv.getServices({
            registry: { tag: 'SaaS' },
            destination: { tag: 'destination' }
        });
        dependencies.push({ xsappname: services.destination.xsappname });
        console.log(">>> SaaS Dependencies:", JSON.stringify(dependencies));
        return dependencies;
    });

}
