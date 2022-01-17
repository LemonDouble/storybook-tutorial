import React from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom/extend-expect';

// Storybook에서 만든 스토리를 테스트에 가져와 렌더링 할 수 있다.
import { WithPinnedTasks } from './TaskLIst.stories';

// Pinned 된 (고정된) Task는 항상 가장 위로 와야 한다!
it('renders pinned tasks at the start of the list', () => {
    // div란 Dom Element 하나 만들고
    const div = document.createElement('div');
    // ReactDom 통해서 Render
    // story's args used with our test
    ReactDOM.render(<WithPinnedTasks {...WithPinnedTasks.args} />, div);

    // we expect the task titled "Task 6" (pinned) to be rendered first, not at the end
    // eslint-disable-next-line testing-library/no-node-access
    const lastTaskInput = div.querySelector('.list-item:nth-child(1) input[value="Task 6 (pinned)"]');
    expect(lastTaskInput).not.toBe(null);

    ReactDOM.unmountComponentAtNode(div);
});