import {envs} from './config'
import {AppRoutes} from './presentation/routes'
import {Server} from './presentation/server'
import {createServer} from 'node:http'
import {WssService} from './presentation/services'

(async () => {
    main()
})()

function main() {
    const server = new Server({
        port: envs.PORT,
    })

    const httpServer = createServer(server.app)
    WssService.initWss({server: httpServer})

    server.setRoutes(AppRoutes.routes)

    httpServer.listen(envs.PORT, () => {
        console.log(`Server running on port: ${envs.PORT}`)
    })
}
