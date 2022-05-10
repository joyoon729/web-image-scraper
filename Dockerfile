ARG VARIANT="16-bullseye"
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-${VARIANT}

WORKDIR "/workspaces"
ENTRYPOINT ["node", "app.js"]
CMD ["https://naver.com/"]