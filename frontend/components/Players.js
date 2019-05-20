import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import { USER_NOTES_QUERY, Columns, NotesList } from './Games';
import Select from 'react-select';
import ReactSelectStyles from './styles/ReactSelectStyles';
import Form from './styles/Form';
import Error from './ErrorMessage';