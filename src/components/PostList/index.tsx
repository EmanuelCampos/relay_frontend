import React from 'react';
import {Text, SafeAreaView, FlatList} from 'react-native';
import {graphql, usePaginationFragment} from 'react-relay';

type Props = {
  query: any;
};

const PostList = ({query}: Props) => {
  const {data, loadNext} = usePaginationFragment(
    graphql`
      fragment PostList_query on Query
      @argumentDefinitions(
        first: {type: Int, defaultValue: 5}
        after: {type: String}
      )
      @refetchable(queryName: "PostListQuery") {
        posts(first: $first, after: $after) @connection(key: "PostList_posts") {
          edges {
            node {
              id
              title
            }
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
        }
      }
    `,
    query,
  );

  const {posts} = data;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f2f2f2'}}>
      <FlatList
        data={posts.edges}
        renderItem={({item}) => (
          <Text style={{fontSize: 20, marginBottom: 16}}>
            {item?.node.title}
          </Text>
        )}
        keyExtractor={item => item.node.id}
        onEndReached={() => loadNext(5)}
        onEndReachedThreshold={0.1}
      />
    </SafeAreaView>
  );
};

export default PostList;
