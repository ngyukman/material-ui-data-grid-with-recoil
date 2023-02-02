import { Box } from "@mui/material";
import { useRecoilValue } from "recoil";
import { userListAtom } from "./GridState";

export default function Footer() {
	console.log('re-render footer');
	const users = useRecoilValue(userListAtom);
	return (<Box>{users.map(u => u.age).reduce((partialSum, a) => partialSum + a, 0)}</Box>);
}