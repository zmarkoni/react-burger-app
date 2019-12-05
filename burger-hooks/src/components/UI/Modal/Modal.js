import React from 'react';
import classes from './Modal.css'
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => {

    // Will use React.memo() which will have opposite logic than shouldComponentUpdate, since it will not update component
    // shouldComponentUpdate(nextProps, nextState) {
    //     return props.show !== nextProps.show || nextProps.children !== props.children;
    // }

    return (
        <Aux>
            <Backdrop show={props.show} clicked={props.modalClosed}/>
            <div
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}
                className={classes.Modal}>
                {props.children}
            </div>
        </Aux>
    )
};
export default React.memo(
    modal,
    (prevProps, nextProps) =>
        prevProps.show === nextProps.show &&
        prevProps.children === nextProps.children
);