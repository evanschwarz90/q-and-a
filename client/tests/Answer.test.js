import React from 'react';
import Answer from '../components/Answer.jsx';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

// Test Data for Answer
const testAnswer = {"id":10,"body":"I've thrown it in the wash and it seems fine","date":"2017-01-04T00:00:00.000Z","answerer_name":"skilover","helpfulness":9,"photos":["https://images.unsplash.com/photo-1510551310160-589462daf284?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1649&q=80","https://images.unsplash.com/photo-1469504512102-900f29606341?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"]};

describe('Answer Component', () => {
  it('should change state.helpfulClicked to true and increment helpfulness on click of "Helpful? Yes" button', () => {
    const wrapper = shallow(<Answer answer={testAnswer} key={0}/>);
    let preClickHelpfulness = wrapper.state('helpfulness');

    let helpfulButton = wrapper.find('.aHelpfulBtn');

    helpfulButton.simulate('click');

    let helpfulState = wrapper.state('helpfulClicked');
    let postClickHelpfulness = wrapper.state('helpfulness');

    expect(helpfulState).toEqual(true);
    expect(postClickHelpfulness).toEqual(preClickHelpfulness + 1);
  })

  it('should change report button to gray "Reported" button if report button is clicked', () => {
    const wrapper = shallow(<Answer answer={testAnswer} key={0}/>);

    let reportButton = wrapper.find('.aReportBtn');

    reportButton.simulate('click');

    // refreshes reportButton
    reportButton = wrapper.find('.aReportBtn');

    expect(reportButton.hasClass('btn-secondary')).toEqual(true);
    expect(reportButton.text()).toEqual('Reported');
  })

  it('should match test snapshot', () => {
    const questionDisplay = renderer.create(<Answer answer={testAnswer} key={0}/>).toJSON();
    expect(questionDisplay).toMatchSnapshot();
  })
});