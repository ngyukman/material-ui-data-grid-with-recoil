import { atom, DefaultValue, selectorFamily } from "recoil"
import {
	randomInt,
	randomId,
	randomUserName
} from '@mui/x-data-grid-generator';

export interface User {
    id: string,
    username: string,
    age: number
}

export const userListInitialState = atom<User[]>({
	key: 'userListInitialState',
	default: [
		{ id: randomId(), username: randomUserName(), age: randomInt(1, 99) },
		{ id: randomId(), username: randomUserName(), age: randomInt(1, 99) },
		{ id: randomId(), username: randomUserName(), age: randomInt(1, 99) },
		{ id: randomId(), username: randomUserName(), age: randomInt(1, 99) },
		{ id: randomId(), username: randomUserName(), age: randomInt(1, 99) },
		{ id: randomId(), username: randomUserName(), age: randomInt(1, 99) },
	]
});

export const userListAtom = atom<User[]>({
    key: 'userIdList',
	default: userListInitialState
})

export const userSelectorFamily = selectorFamily<User, string>({
    key: 'userFamily',
	get: (id) => ({get}) => {
		return get(userListAtom).find(u => u.id === id)!!;
	},

	set: (id) => ({get, set}, newValue) => {
		if (!(newValue instanceof DefaultValue)) {
			const state =  get(userListAtom);
			set(userListAtom, state.map(u => u.id === id ? newValue : u));
		}
	},
})

