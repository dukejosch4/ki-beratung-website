#!/bin/bash
pkill -f "next" 2>/dev/null
sleep 1
rm -rf .next node_modules/.cache
npx next dev --port 3000
