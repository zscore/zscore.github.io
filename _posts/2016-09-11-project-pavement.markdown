---
layout: post
title:  "Bicycle Pavement Data"
date:   2016-09-11 17:42:01 -0500
categories: data
---

## The Setup


I was briefly obsessed with the idea of improving the cycling experience around Chicago. The idea was that we could mount accelerometers to bicycles' handlebars and use the data to map street quality. I had visions of modeling the effects of individual cyclists' and of applying some really neat DSP filters to back out pavement qualities. Then, we would take these street ratings and put a routing engine on top. If you want to
watch the presentation instead of read the rest, it's on [YouTube](www.linkedin.com/in/zane-blanton-b7b62145).


## Difficulties that one runs into:

1. Recruiting users (the app has no features for the user and drains a lot of battery, and the handlebar mounts put the user's phone at risk)
2. Creating and deploying apps across iOS and Android.
3. Keeping the underlying webapp running and archiving data.
4. Snapping noisy GPS trails to street segments.
5. Ground truth for "bad pavement".

These were solved to the first order by Michael Hassin, but inevitably early solutions break down as more data are gathered. I ended up solving this problem in a somewhat satisfactory way, enough at least to expiate my guilt at working for an auto insurance company.

## Taking a Step Back

Inevitably though, one bumps up against the idea that more money could solve the issues one is facing. Ways money could help solve the problem:

1. You can pay developers to do all the technical work well and data scientists and engineers to properly analyze the data.
2. You can hire an engineering firm to go around streets with a
[laser truck](http://www.acuitylaser.com/products/category/road-profiling)
and measure the actual characteristics of the data:
3. You can pay to install bicycle lanes throughout the city.
4. You can pay lobbyists to increase government support for bicycle lanes.

The options one has for getting this money are

1. Become rich and do philanthropy.
2. Applying for grants.
3. Becoming a politician.
4. Developing a self-sustaining business model to support this. <https://ride.report/> does a great job with this <https://www.strava.com/> is okay), and certainly Waze, Google, or Uber could provide a good solution if the business team thought it would be profitable.

## Winding Down

In another light, it's more of a culture problem than anything. Places like Amsterdam don't have to resort to janky crowd-sourced solutions since the public believes that it's important to have good cycling infrastructure. I suppose if one believes that the idea is to win hearts and minds, one needs to study activism techniques and start organizing. I guess the lesson here is that if you
start trying to do data science in order to create a solution to a problem,
you may end up figuring out things that are more effective to do than just
statistics.
