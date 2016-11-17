import { Map } from 'immutable';

import {
  ImageComponent,
  VideoComponent,
  KatexComponent,
} from '../components';

export default Map({ // eslint-disable-line new-cap
  ImageComponent: {
    component: ImageComponent,
    props: {
      imageUrl: '',
      alt: '',
    },
  },
  VideoComponent: {
    component: VideoComponent,
    props: {
      videoSrc: '',
      videoType: '',
    },
  },
  KatexComponent: {
    component: KatexComponent,
    props: {
      content: '',
    },
  },
});
