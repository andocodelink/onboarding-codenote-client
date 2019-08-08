import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';

jest.mock('../../src/api/');
configure({ adapter: new Adapter() });