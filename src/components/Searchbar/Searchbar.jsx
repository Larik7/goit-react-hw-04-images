import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { FcSearch } from 'react-icons/fc';
import {
  Input,
  SearchButton,
  SearchForm,
  SearchHeader,
  LabelButton,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  // handleChange = ({ target: searchQuery }) => {
  //     this.setState({searchQuery})
  // }

  handleChange = event => {
    this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      return toast.warning('Enter text to search');
    }
    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };
  render() {
    return (
      <SearchHeader>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchButton type="submit">
            <FcSearch />
            <LabelButton />
          </SearchButton>

          <Input
            type="text"
            name="searchQuery"
            autocomplete="off"
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            onChange={this.handleChange}
          />
        </SearchForm>
      </SearchHeader>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
