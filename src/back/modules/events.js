module.exports = (function() {
    const fs = require('fs'),
        request = require('request'),
        path = require('path'),
        paths = require(path.resolve(process.cwd(), 'config/paths')),
        settings = require(path.resolve(process.cwd(), paths.settings)).events;
    let errorHandler = require('./error_handler.js');

    class Events {
        constructor() {
            this.ACCESS_TOKEN = null;
        }

        getAccessToken() {
            var _this = this;
            var APP_SECRET = require('../secrets.js').APP_SECRET;
            var APP_ID = require('../secrets.js').APP_ID;
            var tokenUrl = 'https://graph.facebook.com/oauth/access_token?client_id=' +
                APP_ID + '&client_secret=' + APP_SECRET + '&grant_type=client_credentials';
            return new Promise(function(resolve, reject) {
                request(tokenUrl, function(error, response, body) {
                    if (!error && response.statusCode == 200) {
                        _this.ACCESS_TOKEN = JSON.parse(body).access_token;
                        console.log("_this.ACCESS_TOKEN", _this.ACCESS_TOKEN);
                        resolve();
                    } else {
                        reject();
                    }
                });
            });
        }
        getEventPictureUrl(eventId) {
            let _this = this;
            let eventUrl = `https://graph.facebook.com/v2.10/${eventId}/picture?access_token=${this.ACCESS_TOKEN}&type=large&redirect=0`;

            return new Promise(function(resolove, reject) {
                request(eventUrl, function(error, response, body) {
                    if (!error && response.statusCode == 200) {
                        resolove(body);
                    } else {
                        reject(error);
                    }
                });
            });
        }
        getAllEvents() {
            let uri = `https://graph.facebook.com/v2.10/Irfantheband/events?access_token=${this.ACCESS_TOKEN}&pretty=1&event_state_filter[]=published&limit=100000`;
            return new Promise(function(resolove, reject) {
                request(uri, function(error, response, events) {
                    if (!error && response.statusCode == 200) {
                        resolove(JSON.parse(events).data);
                    } else {
                        reject(error);
                    }
                });
            });
        }
        getUpcomingEvents() {
            let uri = `https://graph.facebook.com/v2.10/Irfantheband/events?access_token=${this.ACCESS_TOKEN}&pretty=1&time_filter=upcoming&event_state_filter[]=published&limit=${settings.front_page_events_count}`;
            return new Promise(function(resolove, reject) {
                request(uri, function(error, response, events) {
                    if (!error && response.statusCode == 200) {
                        resolove(JSON.parse(events).data);
                    } else {
                        reject(error);
                    }
                });
            });
        }
        getPastEvents() {
            let uri = `https://graph.facebook.com/v2.10/Irfantheband/events?access_token=${this.ACCESS_TOKEN}&pretty=1&time_filter=past&event_state_filter[]=published&limit=${settings.front_page_events_count}`;
            return new Promise(function(resolove, reject) {
                request(uri, function(error, response, events) {
                    if (!error && response.statusCode == 200) {
                        resolove(JSON.parse(events).data);
                    } else {
                        reject(error);
                    }
                });
            });
        }
        writeEvents(events) {
            return new Promise((resolve, reject) => {
                fs.writeFile(settings.data_path, JSON.stringify(events), (err) => {
                    if (err) {
                        reject(err);
                    }

                    resolve();
                });
            })
        }

        sortEvents(ev) {
            return ev.sort(function(a, b) {
                return new Date(b.start_time) - new Date(a.start_time);
            });
        }
        getEvents() {
            let events = {};
            let loadEv = () => {
                return new Promise((resolve, reject) => {
                    this.getUpcomingEvents()
                        .then((ev) => {
                            events.upcoming = ev;
                            return this.getPastEvents();
                        }).then((ev) => {
                            events.past = ev;
                            return this.getAllEvents();
                        }).then((ev) => {
                            events.all = ev;
                            resolve();
                        }).catch((er) => {
                            errorHandler(er);
                        })

                });
            };
            return new Promise((resolve, reject) => {
                if (!this.ACCESS_TOKEN) {
                    this.getAccessToken()
                        .then(() => {
                            return loadEv().then(() => {
                                resolve(events);
                            });
                        })
                        .catch((er) => {
                            errorHandler(er);
                        });
                } else {
                    loadEv().then(() => {
                        resolve(events);
                    });
                }
            });
        }
        loadEvents() {
            return this.getEvents().then((ev) => {
                return this.writeEvents(ev);
            }).catch((er) => {
                errorHandler(er);
            });
        }
    }

    return new Events();
}());
