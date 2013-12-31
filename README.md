GRAB-CLI
========

This CLI tool grabs DOM attributes and inner HTML from Web pages.

Installation
============

1. Fetch from GitHub

        git clone https://github.com/hufyhang/grab-cli.git

2. Go to grab-cli directory and then

        npm install . -g

Usage
=====

* To grab inner HTML without DOM attributes:

        grab --url "http://localhost/index.html" --dom "html body div.banner a"
  or

        grab -u "http://localhost/index.html" -d "html body div.banner a"

Example output:

````` {.json}
{ "data" : [{"inner" : "This is an example output."}]}
`````

* To grab with attribute (**grab-cli can ONLY fetch ONE attribute at the moment due to the limit of jQuery.go.js**)

        grab --url "http://localhost/index.html" --dom "html body div.banner a" --attr "href"
  or

        grab -u "http://localhost/index.html" -d "html body div.banner a" -a "href"

Example output:

````` {.json}
{ "data" : [{"href" : "/about.html", "inner" : "This is an example output."}]}
`````

