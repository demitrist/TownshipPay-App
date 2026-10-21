import React from 'react';
import FeaturePlaceholder from '../../components/FeaturePlaceholder';

export default function EditItemScreen({ navigation, route }) {
  return (
    <FeaturePlaceholder
      title="Edit item"
      owner="SG"
      params={route.params}
      bullets={[
        'Load the item by route.params.itemId.',
        'Edit fields and persist locally.',
        'Do not rename the EDIT_ITEM route.',
      ]}
      actions={[{ title: 'Save (pop back)', onPress: () => navigation.goBack(), variant: 'outline' }]}
    />
  );
}
