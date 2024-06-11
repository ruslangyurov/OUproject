import Box from '@mui/system/Box';

export default function BasicBox() {
    return (
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, border: 'solid' }}></Box>
    )
}
