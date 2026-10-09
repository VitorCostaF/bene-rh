package br.com.benerh.diagnostico;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "diagnosticos")
public class Diagnostico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "contact_type", nullable = false, length = 10)
    private String contactType;

    @Column(name = "contact_value", nullable = false, length = 254)
    private String contactValue;

    @Column(nullable = false)
    private int score;

    @Column(length = 120)
    private String route;

    @Column(nullable = false)
    private boolean consent;

    @Column(nullable = false, length = 40)
    private String source;

    @Column(nullable = false, length = 5)
    private String locale;

    @Column(length = 500)
    private String page;

    @Column(name = "utm_source", length = 200)
    private String utmSource;

    @Column(name = "utm_medium", length = 200)
    private String utmMedium;

    @Column(name = "utm_campaign", length = 200)
    private String utmCampaign;

    @Column(name = "utm_content", length = 200)
    private String utmContent;

    @Column(name = "utm_term", length = 200)
    private String utmTerm;

    @Column(name = "submitted_at")
    private Instant submittedAt;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    @OneToMany(mappedBy = "diagnostico", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("ordem ASC")
    private List<DiagnosticoResposta> respostas = new ArrayList<>();

    public void addResposta(DiagnosticoResposta resposta) {
        resposta.setDiagnostico(this);
        respostas.add(resposta);
    }

    public Long getId() { return id; }
    public String getContactType() { return contactType; }
    public void setContactType(String contactType) { this.contactType = contactType; }
    public String getContactValue() { return contactValue; }
    public void setContactValue(String contactValue) { this.contactValue = contactValue; }
    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }
    public String getRoute() { return route; }
    public void setRoute(String route) { this.route = route; }
    public boolean isConsent() { return consent; }
    public void setConsent(boolean consent) { this.consent = consent; }
    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }
    public String getLocale() { return locale; }
    public void setLocale(String locale) { this.locale = locale; }
    public String getPage() { return page; }
    public void setPage(String page) { this.page = page; }
    public String getUtmSource() { return utmSource; }
    public void setUtmSource(String utmSource) { this.utmSource = utmSource; }
    public String getUtmMedium() { return utmMedium; }
    public void setUtmMedium(String utmMedium) { this.utmMedium = utmMedium; }
    public String getUtmCampaign() { return utmCampaign; }
    public void setUtmCampaign(String utmCampaign) { this.utmCampaign = utmCampaign; }
    public String getUtmContent() { return utmContent; }
    public void setUtmContent(String utmContent) { this.utmContent = utmContent; }
    public String getUtmTerm() { return utmTerm; }
    public void setUtmTerm(String utmTerm) { this.utmTerm = utmTerm; }
    public Instant getSubmittedAt() { return submittedAt; }
    public void setSubmittedAt(Instant submittedAt) { this.submittedAt = submittedAt; }
    public Instant getCreatedAt() { return createdAt; }
    public List<DiagnosticoResposta> getRespostas() { return respostas; }
}
