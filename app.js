const app = require('express')()
const os = require('os')
const cluster = require('cluster')

const PORT = 3000

const clusterWorkerSize = os.cpus().length

if (clusterWorkerSize > 1) {
    if (cluster.isMaster) {
        for (let i=0; i<clusterWorkerSize; i++) {
            cluster.fork()
        }

        cluster.on("exit", (worker) => {
            console.log('Worker', worker.id, 'has exitted.')
        })
    } else {
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT} and worker ${process.pid}`)
        })
    }
} else {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT} with the single worker ${process.pid}`)
    })
}