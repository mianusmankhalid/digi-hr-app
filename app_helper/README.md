## App Helper

It's a project to facilitate with the app itself. It doesn't have any core logic or component for app, but just helpers to make the lives of developer easy. Like renaming the package, injecting api url etc

### List of helpers

* Inject API Url (inject_api_url.js)
  * It injects provided url instead of API url used within the app.
  * Usage:
    * `yarn inject_api_url -r . -a "$URL"`
    * Where -r provided root of the application and -a provides the API url
