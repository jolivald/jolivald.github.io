---
title: About me
---
## About me

![Profile picture](/assets/images/about.jpg)

Hello, my name is Jonathan and I'm passionate about computers since I was a child.

I have a good technical culture, especially open source softwares, which helps me identify the right opportunities when evaluating new technologies.

---

Continuous learning is what makes me like the web most, with its abundance of creativity and innovations, it keeps me interested and motivated to stay up to the lastest standards.

If you have questions or simply want to get in touch, feel free to contact me.

{% for entry in site.data.social.networks %}
<a href="{{ entry.url }}" class="mui-btn mui-btn--primary" style="float: left; margin-right: 1rem">
  <i class="material-icons">{{ entry.icon }}</i>
  {{ entry.label }}
</a>
{% endfor %}