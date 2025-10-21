package com.example.halisahaApp.model.enums;

public enum MatchFormat {
    MATCH_5v5("5v5"),
    MATCH_7v7("7v7"),
    MATCH_11v11("11v11");

    private final String label;

    MatchFormat(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }

    public static MatchFormat fromLabel(String label) {
        for (MatchFormat format : MatchFormat.values()) {
            if (format.getLabel().equalsIgnoreCase(label)) {
                return format;
            }
        }
        throw new IllegalArgumentException("Unknown match format: " + label);
    }
}
