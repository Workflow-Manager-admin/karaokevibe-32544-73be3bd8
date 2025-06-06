#!/bin/bash
cd /home/kavia/workspace/code-generation/karaokevibe-32544-73be3bd8/karaoke_app
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

