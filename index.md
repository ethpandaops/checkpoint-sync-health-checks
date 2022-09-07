---
layout: default
---

This page shows the uptime of endpoints that are listed [HERE](https://eth-clients.github.io/checkpoint-sync-endpoints/)

Networks:
{% for network in site.data.endpoints %}
  - [{{network[0] | capitalize}}](#{{network[0]}})
{% endfor %}

{% for network in site.data.endpoints %}
{% assign endpoints = network[1] | sample:99999 %}
### {{network[0] | capitalize}}

| Name      |                  Endpoint                   | Health checks |
|:----------|:--------------------------------------------|:--------------|{% for endpoint in endpoints %}
| {{endpoint.name}} | [{{endpoint.endpoint}}]({{endpoint.endpoint}}) | {% if endpoint.health %}{% assign healthchecks = endpoint.health | reverse %}{%- for health in healthchecks -%}{% if health.result %}<span title="{{health.date}}" style="color:#7cb342;cursor:pointer;">▇</span>{% else %}<span title="{{health.date}}" style="color:#f55d52;cursor:pointer;" >▁</span>{% endif %} {%- endfor -%}{% endif %} |{% endfor %}

{% endfor %}
