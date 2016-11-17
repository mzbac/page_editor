import React, { Component, PropTypes } from 'react';
import plyr from 'plyr';
import { toLower } from 'lodash';
import styles from './VideoComponent.css';

const MATCHVIMEO_URL = /https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/ //eslint-disable-line
const MATCHYOUTUBE_URL = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/ // eslint-disable-line

class VideoComponent extends Component {
  constructor() {
    super();
    this.getPlayer = () => this._getPlayer();
  }

  componentDidMount() {
    if (this.plyr) {
      this.player = plyr.setup(this.plyr)[0];
    }
  }

  componentWillUnmount() {
    // Cleanup plyr
    if (this.plyr && this.player) {
      this.player.destroy();
    }
  }

  _getVimeoId(url) {
    if (MATCHVIMEO_URL.test(url)) {
      return url.match(MATCHVIMEO_URL)[3];
    }
    return undefined;
  }

  _getYoutubeId(url) {
    if (MATCHYOUTUBE_URL.test(url)) {
      return url && url.match(MATCHYOUTUBE_URL)[1];
    }
    return undefined;
  }

  _getPlayer() {
    const { videoSrc, videoType } = this.props;
    if (
      toLower(videoType) === 'vimeo'
      || toLower(videoType) === 'youtube'
      || this._getYoutubeId(videoSrc)
      || this._getVimeoId(videoSrc)) {
      return (
        <div
          data-type={toLower(videoType)
          || this._getYoutubeId(videoSrc) ? 'youtube' : undefined
          || this._getVimeoId(videoSrc) ? 'vimeo' : undefined}
          data-video-id={this._getYoutubeId(videoSrc) || this._getVimeoId(videoSrc)}
          ref={ref => (this.plyr = ref)}
        />
      );
    }

    return (
      <video
        ref={(ref) => {
          this.plyr = ref;
        }}
        controls
        crossOrigin
      >
        <source src={videoSrc} type={`video/${videoType}`} />
      </video>
    );
  }

  render() {
    return (
      <div className={styles.container} >
        {this.getPlayer()}
      </div>
    );
  }
}

VideoComponent.propTypes = {
  videoSrc: PropTypes.string,
  videoType: PropTypes.string,
};

export default VideoComponent;