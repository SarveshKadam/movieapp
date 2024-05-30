import React from 'react';
import TestRenderer from 'react-test-renderer';
import { ScrollView, View, Text } from 'react-native';
import ResponsiveCardContainer from '../CardContainer';

describe('ResponsiveCardContainer Component', () => {
  it('renders correctly with given children', () => {
    const tree = TestRenderer.create(
      <ResponsiveCardContainer>
        <View>
          <Text>Child 1</Text>
        </View>
        <View>
          <Text>Child 2</Text>
        </View>
      </ResponsiveCardContainer>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('applies styles correctly', () => {
    const tree = TestRenderer.create(
      <ResponsiveCardContainer>
        <View>
          <Text>Child 1</Text>
        </View>
        <View>
          <Text>Child 2</Text>
        </View>
      </ResponsiveCardContainer>
    );
    const instance = tree.root;
    const scrollView = instance.findByType(ScrollView);

    expect(scrollView.props.contentContainerStyle).toMatchObject({
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      padding: 10,
    });
  });
});
