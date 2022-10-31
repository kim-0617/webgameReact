const React = require('react');
const Component = React.PureComponent;

// class Ball extends Component {
//     render() {
//         const { number } = this.props;
//         let background;
//         if (number <= 10) {
//             background = 'red';
//         }
//         else if (number <= 20) {
//             background = 'blue';
//         }
//         else if (number <= 30) {
//             background = 'orange';
//         }
//         else if (number <= 45) {
//             background = 'purple';
//         }
//         return (
//             <div className='ball' style={{ background }}>{number}</div>
//         );
//     }
// }

const {memo} = React;
const Ball = memo(({ number }) => {
    let background;
    if (number <= 10) {
        background = 'red';
    }
    else if (number <= 20) {
        background = 'blue';
    }
    else if (number <= 30) {
        background = 'orange';
    }
    else if (number <= 45) {
        background = 'purple';
    }
    return (
        <div className='ball' style={{ background }}>{number}</div>
    );
});

export default Ball;