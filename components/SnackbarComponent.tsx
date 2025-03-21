import { hideSnackbar } from '@/store/snackbarSlice';
import React from 'react';
import { Snackbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

const SnackbarComponent = () => {
    const dispatch = useDispatch();
    const { visible, message } = useSelector((state: any) => state.snackbar);

    return (
        <Snackbar
            visible={visible}
            onDismiss={() => dispatch(hideSnackbar())}
            style={{ position: 'absolute', bottom: 20, zIndex: 9999 }}
            action={{
                label: 'OK',
                onPress: () => dispatch(hideSnackbar()),
            }}
        >
            {message}
        </Snackbar>
    );
};

export default SnackbarComponent;
