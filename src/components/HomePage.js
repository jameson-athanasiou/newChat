import React from 'react';

import Button from './Button';
import TextBox from './TextBox';

export default class HomePage extends React.Component {
    render() {
        return <div>
                <TextBox />
                <Button />
              </div>;
    }
}
