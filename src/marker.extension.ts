declare var google;

export interface MarkerAnimation {
    latLng: any;
    duration: number;
}

google.maps.Marker.prototype.playing = false;
google.maps.Marker.prototype.queue = [];
google.maps.Marker.prototype.step = 0;
google.maps.Marker.prototype.iterator = 0;
google.maps.Marker.prototype.steps = [];
google.maps.Marker.prototype.curPos = null;
google.maps.Marker.prototype.animationFrame = function () {
    this.setPosition(this.steps.shift());
    if (this.steps.length !== 0)
        requestAnimationFrame(() => this.animationFrame());
    else {
        this.playing = false;
        if (this.queue.length != 0)
            this.animateTo(this.queue.shift());
    }
}
google.maps.Marker.prototype.animateTo = function ({ latLng, duration }: MarkerAnimation) {
    if (this.playing) {
        this.queue.push({ latLng, duration });
    } else {
        this.playing = true;
        this.step = (100 / (duration * 6000));
        this.iterator = 0;
        this.curPos = this.getPosition()
        this.steps = Array.apply(null, { length: duration * 60 }).map((i) => google.maps.geometry.spherical.interpolate(this.curPos, latLng, this.iterator += this.step));
        if (this.steps.length !== 0)
            requestAnimationFrame(() => this.animationFrame());
    }
}