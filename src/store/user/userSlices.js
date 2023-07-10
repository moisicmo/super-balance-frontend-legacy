import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        typeUsers: [],
        roles: [],
        permissions: [],
        carrers: [],
    },
    reducers: {
        //users
        setUsers: (state, action) => {
            state.users = action.payload.users;
        },
        setAddUser: (state, action) => {
            state.users = [...state.users, action.payload.user];
        },
        setUpdateUser: (state, action) => {
            state.users = [...state.users.map((e) => {
                if (e.id === action.payload.user.id) {
                    return {
                        ...action.payload.user
                    }
                }
                return e
            })];
        },
        setDeleteUser: (state, action) => {
            state.users = [...state.users.filter(e => e.id != action.payload.id)];
        },
        //type users
        setTypeUsers: (state, action) => {
            state.typeUsers = action.payload.typeUsers;
        },
        setAddTypeUser: (state, action) => {
            state.typeUsers = [...state.typeUsers, action.payload.typeUser];
        },
        setUpdateTypeUser: (state, action) => {
            state.typeUsers = [...state.typeUsers.map((e) => {
                if (e.id === action.payload.typeUser.id) {
                    return {
                        ...action.payload.typeUser
                    }
                }
                return e
            })];
        },
        setDeleteTypeUser: (state, action) => {
            state.typeUsers = [...state.typeUsers.filter(e => e.id != action.payload.id)];
        },
        //roles
        setRoles: (state, action) => {
            state.roles = action.payload.roles;
        },
        setAddRole: (state, action) => {
            state.roles = [...state.roles, action.payload.role];
        },
        setUpdateRole: (state, action) => {
            state.roles = [...state.roles.map((e) => {
                if (e.id === action.payload.role.id) {
                    return {
                        ...action.payload.role
                    }
                }
                return e
            })];
        },
        setDeleteRole: (state, action) => {
            state.roles = [...state.roles.filter(e => e.id != action.payload.id)];
        },
        //permisions
        setPermissions: (state, action) => {
            state.permissions = action.payload.permissions;
        },
        //carrers
        setCarrers: (state, action) => {
            state.carrers = action.payload.carrers;
        },
    }
});

export const {
    //users
    setUsers,
    setAddUser,
    setUpdateUser,
    setDeleteUser,
    //type users
    setTypeUsers,
    setAddTypeUser,
    setUpdateTypeUser,
    setDeleteTypeUser,
    //roles
    setRoles,
    setAddRole,
    setUpdateRole,
    setDeleteRole,
    //permisions
    setPermissions,
    //carrers
    setCarrers,
} = userSlice.actions;