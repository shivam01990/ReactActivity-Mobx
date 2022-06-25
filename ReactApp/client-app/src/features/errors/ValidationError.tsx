import React from "react";
import { Message, MessageItem } from "semantic-ui-react";

interface Props {
    error: string[];
}

export default function ValidationErrors({ error }: Props) {
    return (
        <Message error>
            {error && (
                <Message.List>
                    {
                        error.map((err: any, i) => (
                            <MessageItem key={i}>{err}</MessageItem>
                        ))
                    }
                </Message.List>
            )}
        </Message>
    )
}