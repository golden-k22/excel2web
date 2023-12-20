import BookmarkList from './BookmarkList';
import { H6, UL } from '../../../AbstractElements';
import { Bookmarks } from '../../../Constant';

const RemoveBookmark = ({ bookmarkItems }: any) => {
    return (
        <div className="front dropdown-title p-0">
            <H6 className='f-18 p-20' >{Bookmarks}</H6>
            <UL className='simple-list pt-0 p-3 bookmark-dropdown' >
                <BookmarkList bookmarkItems={bookmarkItems} />
            </UL>
        </div>
    );
};
export default RemoveBookmark;