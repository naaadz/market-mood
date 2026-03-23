# Market Data Cache

This directory contains cached market sentiment analysis data.

## How It Works

- **File**: `market-data.json` stores the latest sentiment analysis results
- **Auto-generated**: This file is created/updated when you click "Refresh All"
- **Mock Data**: Initial mock data is provided for UI development
- **Git**: This directory is ignored by git (see `.gitignore`)

## Usage

### Development Mode (Using Mock Data)
1. Use the existing `market-data.json` for UI development
2. No API calls needed - instant loading
3. Edit this file directly to test different scenarios

### Production Mode (Live Data)
1. Click "Refresh All" button in the UI
2. App fetches fresh data from Brave Search API
3. Results are saved to `market-data.json`
4. Next load uses cached data (no API calls)

## Benefits

- **Cost savings**: Only fetch when explicitly requested
- **Fast development**: Work with mock data without API limits
- **Persistent cache**: Data survives server restarts
- **Easy testing**: Manually edit the JSON to test edge cases
