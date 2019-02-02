# X-CORE App

Diploma application. <br/>
Allows to record and modify streams via WebRTC. <br/>

## Development

    ./cli/development/api/setupEnvironment.sh # Docker env for API server.
    ./cli/development/api/start.sh # Start API server.
    ./cli/development/cdn/start.sh # Start CDN server.
    ./cli/development/web_ui/start.sh # Start UI dev server.

## Deployment

    Build:

    ./target/cdn/build.sh
    ./target/api/build.sh    


### Tips:

 - Do not forget to add '/opt' partition as part of shared volumes for docker/virtualbox.
