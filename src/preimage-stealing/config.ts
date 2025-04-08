import * as dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables from .env file
const envPath = path.resolve(__dirname, '.env')
dotenv.config({ path: envPath })

// Export environment variables
export const { DAVE_LND_CERT, DAVE_LND_MACAROON, DAVE_LND_SOCKET, ERIN_LND_CERT, ERIN_LND_MACAROON, ERIN_LND_SOCKET } = process.env