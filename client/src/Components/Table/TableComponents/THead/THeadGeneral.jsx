import Proptypes from 'prop-types';

export default function THeadGeneral({title = "", fieldCollection, hasActionBtn = false}) {
    return(
        <>
           {title && <tr className={"tableTitle"}><th>{title}</th></tr>}
                    <tr>
                        {fieldCollection.map((value, index) => <th key={index}>{value}</th>)}
                        {hasActionBtn && <th className={"tableContent__actionTitle"}>Ações</th>}
                    </tr> 
        </>
    )
}

THeadGeneral.propTypes = {
    title: Proptypes.string,
    fieldCollection: Proptypes.array,
    hasActionBtn: Proptypes.bool
}

