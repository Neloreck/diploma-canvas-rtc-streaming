package com.xcore.application.modules.live.models.messages;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.kurento.client.IceCandidate;

@NoArgsConstructor
@Data
@AllArgsConstructor
public class LiveICECandidateMessage {

  private IceCandidate iceCandidate;

}
