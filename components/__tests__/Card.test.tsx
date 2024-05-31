import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Image } from 'react-native';
import Card from '../Card';
describe('Card Component', () => {
  const props = {
    title: 'Sample Title',
    vote_average: 7.58,
    imageUri: 'sample_image.jpg',
  };

  it('renders correctly with given props', () => {
    const tree = TestRenderer.create(<Card {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the title and release date correctly', () => {
    const tree = TestRenderer.create(<Card {...props} />);
    const instance = tree.root;

    const title = instance.findByProps({ children: props.title });
    const releaseDate = instance.findByProps({ children: props.vote_average });

    expect(title).toBeTruthy();
    expect(releaseDate).toBeTruthy();
  });

  it('renders the image with correct URI', () => {
    const tree = TestRenderer.create(<Card {...props} />);
    const instance = tree.root;

    const image = instance.findByType(Image);
    expect(image.props.source.uri).toBe('https://image.tmdb.org/t/p/w500/sample_image.jpg');
  });
});
