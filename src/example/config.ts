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
export const { BOB_LND_CERT, BOB_LND_MACAROON, BOB_LND_SOCKET } = process.env