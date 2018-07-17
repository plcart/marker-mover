declare var google;

export interface MarkerAnimation {
    latLng: any;
    duration: number;
    framesPerSecond?: number
}

google.maps.Marker.prototype.isOngoingAnimation = false;
google.maps.Marker.prototype.locationBacklog = [];
google.maps.Marker.prototype.animateTo = function ({ latLng, duration, framesPerSecond = 60 }: MarkerAnimation) {
    if (this.isOngoingAnimation) {
        this.locationBacklog.push({ latLng, duration, framesPerSecond });
    } else {
        this.isOngoingAnimation = true;
        const fps = framesPerSecond || 60;
        const totalFrames = fps * duration;
        const iteratorValue = 1 / totalFrames;
        const currentPos = this.getPosition();
        let currentValue = 0;
        const interval = setInterval(() => {
            var newPosition = google.maps.geometry.spherical.interpolate(currentPos, latLng, currentValue);
            this.setPosition(newPosition);
            currentValue += iteratorValue;
            if (currentValue >= 1) {
                this.isOngoingAnimation = false;
                clearInterval(interval);
                const nextLocation = this.locationBacklog.shift();
                if(nextLocation)
                    this.animateTo(nextLocation);
            }
        }, 1000 / fps);
    }
}