import React from 'react';

import './Collection-preview.style.scss';

import CollectionItem from '../collection-item/Collection-item.component';

const CollectionPreview = ({title, items}) => (
    <div className='collection-preview'>
        <h1>{title.toUpperCase()}</h1>
        <div className='preview'>
            {
                items.filter((item, idx) => (idx < 4)).map(({ id, ...otherItemProps}) => (
                    <CollectionItem key={id} {...otherItemProps} />
                ))
            }
        </div>
    </div>
);

export default CollectionPreview;